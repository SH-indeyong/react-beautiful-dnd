import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: "1", text: "text1" },
    { id: "2", text: "text2" },
    { id: "3", text: "text3" },
    { id: "4", text: "text4" },
    { id: "5", text: "text5" },
  ]);

  // onDragEnd 함수: react-beautiful-dnd 라이브러리에서 제공하는 콜백 함수
  // 드래그가 끝날 때마다 호출
  // result 매개변수: 드래그에 관련된 정보
  const handleOnDragEnd = (result) => {
    // 드롭 대상이 없다면 함수를 종료
    if (!result.destination) return;
    // items state의 복사본 생성
    const itemsCopy = Array.from(items);
    // 드래그한 아이템의 원래 인덱스를 찾아서 해당 아이템을 삭제
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    // 드랍한 위치에 아이템을 삽입
    itemsCopy.splice(result.destination.index, 0, reorderedItem);
    // 새로 배열 itemsCopy로 items state를 업데이트
    setItems(itemsCopy);
  };

  return (
    <div className="App">
      {/* DragDropContext: 모든 Draggable 및 Droppable 구성 요소를 래핑 */}
      {/* onDragEnd 이벤트 핸들러: 항목 이동을 마쳤을 때 호출됩니다. */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Droppable: 하나 이상의 Draggable 구성 요소를 포함 할 수 있는 드롭 영역을 나타냄 */}
        {/* droppableId: 이 Droppable의 ID */}
        <Droppable droppableId="items">
          {(provided) => (
            // Droppable에서 Draggable의 복제본이 드롭될 수 있도록 items 배열을 매핑하고 각 항목에 대한 Draggable을 생성
            <div {...provided.droppableProps} ref={provided.innerRef} className="column">
              {items.map(({ id, text }, index) => (
                // Draggable: 사용자가 드래그하여 이동할 수 있는 항목
                // draggableId: 이 Draggable의 고유 ID
                // index: 이 Draggable의 배열 위치
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    // 드래그 가능한 블록을 만들고 내부에 텍스트를 표시
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="block"
                    >
                      <p>{text}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* placeholder: Droppable에서 Draggable을 렌더링하기 위해 필요한 요소 수에 따라 크기를 조정*/}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
